import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Uso: npm run hash-password -- SUA_SENHA");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const b64 = Buffer.from(hash).toString("base64");

console.log("\nAdicione ao .env.local:\n");
console.log(`ADMIN_PASSWORD_HASH_B64=${b64}`);
console.log("\nOu salve em data/admin.hash:\n");
console.log(hash);
