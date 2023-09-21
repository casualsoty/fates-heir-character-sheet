export class FatesHeirCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
  get template() {
    return 'modules/fates-heir-character-sheet/templates/actors/fates-heir-character-sheet.hbs';
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['actor', 'character', 'dnd5e', 'fates-heir-sheet', 'sheet'],
      height: 30 + (1305 * 720 / 922),
      width: 720
    });
  }
}
