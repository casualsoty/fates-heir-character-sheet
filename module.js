import { FatesHeirCharacterSheet } from './scripts/fates-heir-character-sheet.js';

Hooks.once('init', _ => {
  Actors.registerSheet('dnd5e', FatesHeirCharacterSheet, {
    makeDefault: true,
    types: ["character"]
  });
});
