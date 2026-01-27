// Stub file for production builds
// This file is committed to git and used when guests-data.ts doesn't exist
// For local development, create guests-data.ts (gitignored) with your actual guest data
export const GUEST_LIST_DATA: Record<string, { names: string[]; email?: string }> = {};
