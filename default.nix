{ pkgs ? import <nixpkgs> {} }:

with pkgs;

let
  ruby = ruby_2_6;
in
mkShell {
  buildInputs = [ ruby git gnumake ];
}
