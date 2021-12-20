export default function actor(state = "", action) {
  console.log("state " + state + "action " + JSON.stringify(action));
  switch (action.type) {
    case "@actor/id":
      return action.id;
    default:
      return state;
  }
}
