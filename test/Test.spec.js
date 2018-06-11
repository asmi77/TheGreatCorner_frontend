import { assert, expect, should } from "chai";
import { mount } from "avoriaz";
import Users from "../src/users/Users.vue";
import Class from "../src/Class.vue"; 
import Login from "../src/Login.vue"; 

//Test presence of class welcome in Class.vue
describe('Class.vue', () => {
  it('has a root element with class welcome', () => {
    const wrapper = mount(Class)
    expect(wrapper.is('.welcome')).to.equal(true)
  })
})

//Test data element in Users.vue
describe("Users.vue", () => {
  it("renders page title", () => {
    const wrapper = mount(Users);
    expect(wrapper.data().title).to.equal("The GreatCorner");
  });

  it("has a created hook", () => {
    assert.typeOf(Users.created, "function");
  });

  it('array should start empty', () => {
    const arr = [];
    assert.equal(arr.length, 0);
  });
});


