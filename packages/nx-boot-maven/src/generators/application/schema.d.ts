import { LanguageType, PackagingType } from '@jnxplus/common';

export interface NxBootMavenAppGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  simpleName?: boolean;
  simplePackageName?: boolean;
  language: LanguageType;
  groupId: string;
  projectVersion: string;
  packaging: PackagingType;
  configFormat: '.properties' | '.yml';
  parentProject?: string;
  minimal?: boolean;
  port: string | number;
}
