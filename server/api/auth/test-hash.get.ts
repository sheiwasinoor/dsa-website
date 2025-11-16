// server/api/auth/test-hash.get.ts
import { hashPassword, verifyPassword } from "~/server/utils/hash";

export default defineEventHandler(async () => {
  const plain = "WasiLovesSu";

  // 1) Generate a hash for this exact password in *your* environment
  const hashed = await hashPassword(plain);

  // 2) Double-check bcrypt works as expected
  const ok = await verifyPassword(plain, hashed);
  const bad = await verifyPassword("wrong-password", hashed);

  console.log("🧪 TEST HASH GENERATED:", hashed);
  console.log("✅ verify(plain, hash):", ok);
  console.log("❌ verify('wrong', hash):", bad);

  return {
    plain,
    hashed,
    ok,
    bad,
  };
});