export class FatesHeirCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
  constructor(...args) {
    super(...args);

    if (!this.actor.getFlag('fates-heir-character-sheet', 'level')) {
      this.actor.setFlag('fates-heir-character-sheet', 'level', 1);
    }
    if (!this.actor.system.attributes.hp.value) {
      this.actor.system.attributes.hp.value = 11;
    }
  }

  get template() {
    return 'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs';
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['actor', 'character', 'dnd5e', 'fhcs', 'sheet'],
      height: 30 + (1305 * 720 / 922),
      width: 720
    });
  }
}
