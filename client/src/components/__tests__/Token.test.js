import Token from "../Token";

test("token works properly", () => {
    const x = Math.random() * 100;
    Token.value = x;
    const bool1 = Token.value == x;
    Token.remove();
    const bool2 = bool1 && Token.value == undefined;
    expect(bool2).toBe(true);
})
