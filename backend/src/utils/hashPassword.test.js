require("dotenv").config();
const bcrypt = require("bcryptjs");
const hashPassword = require("../utils/hashPassword");

jest.mock("bcryptjs");

describe("hashPassword", () => {
  beforeAll(() => {
    process.env.SALT_ROUNDS = "10";
  });

  it("should hash the password correctly", async () => {
    const password = "mySecretPassword";

    bcrypt.hash.mockResolvedValue("hashedPassword123");

    const hashedPassword = await hashPassword(password);

    expect(bcrypt.hash).toHaveBeenCalledWith(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    expect(hashedPassword).toBe("hashedPassword123");
  });

  it("should return a hashed password different from the original", async () => {
    const password = "mySecretPassword";
    bcrypt.hash.mockResolvedValue("differentHashedPassword");

    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).not.toBe(password);
  });
});
