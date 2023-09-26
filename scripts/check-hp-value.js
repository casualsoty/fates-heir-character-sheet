export const checkHpValue = _ => {
  if ($('.character-hp-value').val() > 8 + $('.character-level').val() * 3) {
    setTimeout(_ => $('.character-hp-value').val(8 + $('.character-level').val() * 3), 9);
  }
}
