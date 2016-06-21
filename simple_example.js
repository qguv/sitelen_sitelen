window.onload = function() {
  d = document.getElementById('toki-stack-container');
  render_toki(d, "sina suli. mi pona. mi moku. sina pona. sina pona! telo li pona. suno li suli! jan li pona. mi moku e kili. ona li lukin e pipi. ona li pona e ijo. sina jo e ilo. ona li wile pakala. sina wile unpa. ona li wile pakala e pipi. sina wile unpa e ona.");

  renderForeign(d, ['o', 'la', 'pu', 'jan', 'sen', 'pi']);
  renderElements(d, [{container: 'stack', glyphs: ['sina', 'suli', {punctuation: 'period'}]}]);
  renderElements(d, [{container: 'stack', glyphs: ['mi', 'pona', {punctuation: 'period'}]}]);
  renderElements(d, [{container: 'stack', direction: 'row', glyphs: ['mi', 'moku', {punctuation: 'period'}]}]);
  renderElements(d,
          [{container: 'stack', glyphs: ['mi', 'moku', {punctuation: 'period'}]}]);
  renderElements(d,
          [{container: 'stack', glyphs: ['sina', 'pona', {punctuation: 'period'}]}]);
  renderElements(d,
          [{container: 'stack', glyphs: ['sina', 'pona', {punctuation: 'exclamation'}]}]);
  renderElements(d,
          [{
              container: 'stack',
              direction: 'row',
              glyphs: ['telo', {container: 'li', glyphs: ['pona']}, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack',
              glyphs: ['suno', {container: 'li', glyphs: ['suli']}, {punctuation: 'exclamation'}]
          }]);
  renderElements(d,
          [{container: 'stack', glyphs: ['jan', {container: 'li', glyphs: ['pona']}, {punctuation: 'period'}]}]);
  renderElements(d,
          [{
              container: 'stack',
              glyphs: ['mi', 'moku', {container: 'e', glyphs: ['kili']}, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack',
              glyphs: ['ona', {container: 'li', glyphs: ['lukin']}, {
                  container: 'e',
                  glyphs: ['pipi']
              }, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack', direction: 'row',
              glyphs: ['ona', {container: 'li', glyphs: ['pona']}, {
                  container: 'e',
                  glyphs: ['ijo']
              }, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack', format: '2-by-2',
              glyphs: ['sina', 'jo', {container: 'e', glyphs: ['ilo']}, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack', format: '2-by-2', direction: 'row',
              glyphs: ['ona', {
                  container: 'li',
                  direction: 'row',
                  glyphs: ['wile', 'pakala']
              }, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack', format: '2-by-2', direction: 'row',
              glyphs: ['sina', 'wile', 'unpa', {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack', direction: 'row',
              glyphs: ['ona', {container: 'li', direction: 'row', glyphs: ['wile', 'pakala']}, {
                  container: 'e', glyphs: ['pipi']
              }, {punctuation: 'period'}]
          }]);
  renderElements(d,
          [{
              container: 'stack', direction: 'row',
              glyphs: ['sina', 'wile', 'unpa', {container: 'e', glyphs: ['ona']}, {punctuation: 'period'}]
          }]);
};

/* vi: set ai et sw=2 sts=2: */
