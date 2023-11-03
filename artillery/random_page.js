module.exports = {
  generateRandomPage: generateRandomPage,
};

const PER_PAGE_LIST = [10, 20, 30, 50, 100];
const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';

function generateRandomPage(context, events, done) {
  context.vars['page'] = Math.ceil(Math.random() * 100);
  context.vars['perPage'] = PER_PAGE_LIST[Math.floor(Math.random() * 5)];
  context.vars['searchText'] = ALPHABETS[Math.floor(Math.random() * 26)];
  context.vars['isDesc'] = Math.random() > 0.5;
  return done();
}
