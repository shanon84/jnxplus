import { formatFiles, generateFiles, offsetFromRoot, Tree } from '@nx/devkit';
import * as path from 'path';
import { kotlinVersion, springBootVersion } from '@jnxplus/common';
import { NxMavenGeneratorSchema } from './schema';

interface NormalizedSchema extends NxMavenGeneratorSchema {
  dot: string;
  kotlinVersion: string;
  springBootStarterParentVersion: string;
}

function normalizeOptions(
  tree: Tree,
  options: NxMavenGeneratorSchema
): NormalizedSchema {
  const dot = '.';

  return {
    ...options,
    dot,
    kotlinVersion,
    springBootStarterParentVersion: springBootVersion,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    offsetFromRoot: offsetFromRoot(tree.root),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, '..', 'init', 'files', 'maven', 'wrapper'),
    '',
    templateOptions
  );
}

export default async function (tree: Tree, options: NxMavenGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  addFiles(tree, normalizedOptions);
  tree.changePermissions('mvnw', '755');
  tree.changePermissions('mvnw.cmd', '755');
  await formatFiles(tree);
}