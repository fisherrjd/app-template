{ pkgs ? import
    (fetchTarball {
      name = "jpetrucciani-2026-10-20";
      url = "https://github.com/jpetrucciani/nix/archive/1b477d7aa81019d08fd92ea32e835988fa4849c8.tar.gz";
      sha256 = "0crw41kkvxdhpxklzg4xpx6v7y03150r7g2ygyignx4p061dszip";
    })
    { }

}:
let
  name = "frontend";

  tools = with pkgs; {
    cli = [
      jfmt
      nixup
    ];
    bun = [ bun ];
    node = [ nodejs ];
    scripts = pkgs.lib.attrsets.attrValues scripts;
  };

  scripts = with pkgs; {
    dev = pog {
      name = "dev";
      description = "start the vite dev server";
      script = ''
        if [ ! -d node_modules ]; then
          echo "→ Installing dependencies..."
          bun install
        fi
        bun run dev
      '';
    };

    build = pog {
      name = "build";
      description = "typecheck and build to ./dist";
      script = ''
        if [ ! -d node_modules ]; then
          echo "→ Installing dependencies..."
          bun install
        fi
        bun run build
        echo ""
        echo "✅ Build complete: ./dist"
      '';
    };

    preview = pog {
      name = "preview";
      description = "preview the production build";
      script = ''
        if [ ! -d dist ]; then
          echo "→ No dist/ found. Running build first..."
          ${scripts.build}/bin/build
        fi
        bun run preview
      '';
    };

    check = pog {
      name = "check";
      description = "typecheck only (vue-tsc)";
      script = ''
        if [ ! -d node_modules ]; then
          echo "→ Installing dependencies..."
          bun install
        fi
        bun run typecheck
      '';
    };

    ui-update = pog {
      name = "ui-update";
      description = "pull the latest shared styles/components (@fisherrjd/ui) and typecheck";
      script = ''
        bun update @fisherrjd/ui
        bun run typecheck
        echo ""
        echo "✅ updated — eyeball /styleguide, then commit bun.lock"
      '';
    };
  };
  paths = pkgs.lib.flatten [ (builtins.attrValues tools) ];
  env = pkgs.buildEnv {
    inherit name paths; buildInputs = paths;
  };
in
(env.overrideAttrs (_: {
  inherit name;
  NIXUP = "0.0.11";
})) // { inherit scripts; }
