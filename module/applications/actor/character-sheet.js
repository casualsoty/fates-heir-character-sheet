/*  An Actor sheet for player character type actors.
 */
export class FatesHeirCharacterSheet extends dnd5e.applications.actor.ActorSheet5eCharacter {
  constructor(...args) {
    super(...args);

    if (!this.actor.getFlag('fates-heir-character-sheet', 'level')) {
      this.actor.setFlag('fates-heir-character-sheet', 'level', 1);
    }
  }

  /*  @inheritDoc ActorSheet5eCharacter
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['actor', 'character', 'dnd5e', 'fhcs', 'sheet'],
      height: 30 + (3508 * 720 / 2480),
      width: 720
    });
  }

  /*  @override ActorSheet5eCharacter
   */
  async getData(options={}) {
    const CONTEXT = await super.getData(options);

    return foundry.utils.mergeObject(CONTEXT, {
      powers: {
        alacrity: game.i18n.localize('FHCS.Alacrity'),
        artifice: game.i18n.localize('FHCS.Artifice'),
        beastMastery: game.i18n.localize('FHCS.BeastMastery'),
        command: game.i18n.localize('FHCS.Command'),
        death: game.i18n.localize('FHCS.Death'),
        deception: game.i18n.localize('FHCS.Deception'),
        earth: game.i18n.localize('FHCS.Earth'),
        endurance: game.i18n.localize('FHCS.Endurance'),
        fire: game.i18n.localize('FHCS.Fire'),
        vitality: game.i18n.localize('FHCS.Vitality'),
        knowledge: game.i18n.localize('FHCS.Knowledge'),
        might: game.i18n.localize('FHCS.Might'),
        moon: game.i18n.localize('FHCS.Moon'),
        nature: game.i18n.localize('FHCS.Nature'),
        water: game.i18n.localize('FHCS.Water'),
        air: game.i18n.localize('FHCS.Air'),
        sorcery: game.i18n.localize('FHCS.Sorcery'),
        sun: game.i18n.localize('FHCS.Sun'),
        weaponry: game.i18n.localize('FHCS.Weaponry'),
        time: game.i18n.localize('FHCS.Time')
      }
    });
  }

  /*  @inheritDoc ActorSheet5eCharacter
   */
  activateListeners(html) {
    // power
    for (let i = 1; i < 6; i++) {
      if (this.actor.getFlag('fates-heir-character-sheet', 'power-name-' + i)) {
        html.find('.fhcs-power-name-' + i + '-a').html(this.actor.getFlag('fates-heir-character-sheet', 'power-name-' + i));
        html.find('[name="fhcs-power-name-' + i + '"] option[value="' + this.actor.getFlag('fates-heir-character-sheet', 'power-name-' + i) + '"]').prop('selected', true);
      }
    }

    if (this.actor.isOwner) {
      // level
      html.find('.fhcs-level').on('focusout keypress', e => {
        if (html.find('.fhcs-level').val() !== this.actor.getFlag('fates-heir-character-sheet', 'level')) {
          if (e.type === 'focusout' || e.which === 13) {
            this.actor.setFlag('fates-heir-character-sheet', 'level', html.find('.fhcs-level').val());
          }
        }
      });

      // player-name
      html.find('.fhcs-player-name').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.actor.setFlag('fates-heir-character-sheet', 'player-name', html.find('.fhcs-player-name').val());
        }
      });

      // rest
      html.find('.fhcs-rest-a').click(this._onRest.bind(this));

      // signature-power
      html.find('.fhcs-signature-power').on('focusout', _ => {
        this.actor.setFlag('fates-heir-character-sheet', 'signature-power', html.find('.fhcs-signature-power').val());
      });

      // skill
      html.find('.fhcs-skill-name').click(this._onRollSkillCheck.bind(this));

      html.find('.fhcs-skill-input').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'none');
          this.actor.setFlag('fates-heir-character-sheet', 'skill-' + e.target.dataset.skill, html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').val());
          html.find('.fhcs-skill-' + e.target.dataset.skill + '-name').css('display', 'flex');
        }
      });

      html.find('.fhcs-skill-ai').on('click', e => {
        html.find('.fhcs-skill-' + e.target.dataset.skill + '-name').css('display', 'none');
        html.find('.fhcs-skill-' + e.target.dataset.skill + '-input').css('display', 'block').focus();
      });

      // power
      html.find('.fhcs-power-name').click(this._onRollPowerCheck.bind(this));

      html.find('.fhcs-power-ai').on('click', e => {
        html.find('.fhcs-power-name-' + e.target.dataset.power + '-a').css('display', 'none');
        html.find('[name="fhcs-power-name-' + e.target.dataset.power + '"]').css('display', 'block').focus();
      });

      html.find('[name^="fhcs-power-name-"]').on('change focusout', e => {
        html.find('[name="fhcs-power-name-' + e.target.dataset.power + '"]').css('display', 'none');
        this.actor.setFlag('fates-heir-character-sheet', 'power-name-' + e.target.dataset.power, e.target.value);
        html.find('.fhcs-power-name-' + e.target.dataset.power + '-a').html(e.target.value).css('display', 'flex');
      });

      html.find('.fhcs-power-level').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.actor.setFlag('fates-heir-character-sheet', 'power-level-' + e.target.dataset.power, e.target.value);
        }
      });

      html.find('.fhcs-power-invocation').on('focusout keypress', e => {
        if (e.type === 'focusout' || e.which === 13) {
          this.actor.setFlag('fates-heir-character-sheet', 'power-invocation-' + e.target.dataset.power, e.target.value);
        }
      });
    }

    super.activateListeners(html);
  }

  /*  @override ActorSheet5e
   */
  get template() {
    return 'modules/fates-heir-character-sheet/templates/actors/character-sheet.hbs';
  }

  /*  Handle taking a rest
   *    @param {Event} e      The originating click event.
   */
  async _onRest(e) {
    new Dialog({
      buttons: {
        rest: {
          icon: '<i class="fa-bed fas"></i>',
          label: game.i18n.localize('DND5E.Rest'),
          callback: html => this.rest()
        },
        cancel: {
          icon: '<i class="fa-times fas"></i>',
          label: game.i18n.localize('Cancel')
        }
      },
      content: await renderTemplate('modules/fates-heir-character-sheet/templates/apps/rest.hbs'),
      title: game.i18n.localize('FHCS.Rest') + ': ' + this.actor.name
    }).render(true);
  }

  /*  Handle rolling a Skill check.
   *    @override ActorSheet5e
   *    @param {Event} e  The originating click event.
   *    @private
   */
  async _onRollSkillCheck(e) {
    new Dialog({
      buttons: {
        advantage: {
          label: game.i18n.localize('DND5E.Advantage'),
          callback: html => this.rollSkill(html, '2d100kh', e.target.innerText + ' Skill Check (Advantage)')
        },
        normal: {
          label: game.i18n.localize('DND5E.Normal'),
          callback: html => this.rollSkill(html, '1d100', e.target.innerText + ' Skill Check')
        },
        disadvantage: {
          label: game.i18n.localize('DND5E.Disadvantage'),
          callback: html => this.rollSkill(html, '2d100kl', e.target.innerText + ' Skill Check (Disadvantage)')
        }
      },
      content: await renderTemplate('modules/fates-heir-character-sheet/templates/chat/skill-roll-dialog.hbs', {
        defaultRollMode: game.settings.get('core', 'rollMode'),
        rollModes: CONFIG.Dice.rollModes,
      }),
      title: e.target.innerText + ' Skill Check: ' + this.actor.name
    }).render(true);
  }

  /*  Handle rolling a Power check.
   *    @param {Event} e  The originating click event.
   *    @private
   */
  async _onRollPowerCheck(e) {
    new Dialog({
      buttons: {
        normal: {
          label: game.i18n.localize('DND5E.Normal'),
          callback: html => this.rollPower(html, e.target.dataset.power, e.target.innerText + ' Power Check')
        }
      },
      content: await renderTemplate('modules/fates-heir-character-sheet/templates/chat/power-roll-dialog.hbs', {
        defaultRollMode: game.settings.get('core', 'rollMode'),
        powerInvocationFlag: this.actor.getFlag('fates-heir-character-sheet', 'power-invocation-' + e.target.dataset.power),
        rollModes: CONFIG.Dice.rollModes,
      }),
      title: e.target.innerText + ' Power Check: ' + this.actor.name
    }).render(true);
  }

  /*
   */
  rest = _ => {
    const FLAGS = this.actor.flags['fates-heir-character-sheet'];
    const HP_MAX = 8 + FLAGS.level * (2 + Object.entries(FLAGS).filter(key => String(key).startsWith('power-name-')).map(power => power[1]).includes('Endurance'));
    
    this.actor._rest(1, 1, 1, 0, HP_MAX).then(_ => {
      this.actor.system.attributes.hp.value = HP_MAX;
      $('#' + this.id).find('.fhcs-hp-value').val(HP_MAX);
    });
  }

  /*
   */
  rollSkill = async (html, command, flavor) => {
    const BONUS = html.find('[name="bonus"]').val() ? ' + ' + html.find('[name="bonus"]').val() : '';
    const ROLL = await new Roll(command + ' + ' + this.actor.getFlag('fates-heir-character-sheet', 'level') + ' * 3' + BONUS).evaluate();

    return ROLL.toMessage({
      flavor: flavor,
      speaker: {
        alias: this.actor.name
      }
    }, {
      rollMode: html.find('[name="rollMode"]').val()
    });
  }

  /*
   */
  rollPower = async (html, powerId, flavor) => {
    const BONUS = html.find('[name="bonus"]').val() ? ' + ' + html.find('[name="bonus"]').val() : '';
    const POWER_LEVEL = this.actor.getFlag('fates-heir-character-sheet', 'power-level-' + powerId);
    const POWER_INVOCATION = this.actor.getFlag('fates-heir-character-sheet', 'power-invocation-' + powerId);
    let roll = '';

    switch (html.find('[name="invocation"]:checked').attr('id')) {
      case 'none':
        roll = await new Roll('1d100 + (' + POWER_LEVEL + ' + 0) * 5' + BONUS).evaluate();
        break;
      case 'power':
        roll = await new Roll('1d100 + (' + POWER_LEVEL + ' + 1) * 5' + BONUS).evaluate();
        this.actor.setFlag('fates-heir-character-sheet', 'power-invocation-' + powerId, POWER_INVOCATION > 0 ? POWER_INVOCATION - 1 : 0);
        break;
      case 'advantage':
        roll = await new Roll('2d100kh + (' + POWER_LEVEL + ' + 0) * 5' + BONUS).evaluate();
        this.actor.setFlag('fates-heir-character-sheet', 'power-invocation-' + powerId, POWER_INVOCATION > 0 ? POWER_INVOCATION - 1 : 0);
        break;
    }

    return roll.toMessage({
      flavor: flavor,
      speaker: {
        alias: this.actor.name
      }
    }, {
      rollMode: html.find('[name="rollMode"]').val()
    });
  }
}
