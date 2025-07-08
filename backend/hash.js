const bcrypt = require('bcrypt');
async function run() {
  console.log('Generando hash...');
  const hash = await bcrypt.hash('78021292Diego', 10);
  console.log('Hash:', hash);
}
run();
const bcrypt = require('bcrypt');
bcrypt.hash('nano12', 10, (err, hash) => {
  console.log(hash);
});