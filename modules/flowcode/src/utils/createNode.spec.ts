import {createNode} from "./createNode";

describe("createNode()", () => {
  it("should return output port structure", () => {
    const result = createNode<{ foo: any }, { bar: any }>
    (["bar"], (outputs) => ({
      foo: (value, tag) => {
        outputs.bar(value, tag);
      }
    }));
    expect(result.o).toEqual({
      bar: new Set()
    });
    expect(typeof result.i.foo).toBe("function");
  });
});
