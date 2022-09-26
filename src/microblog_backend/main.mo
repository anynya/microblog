import List "mo:base/List";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor {
  public type Microblog = actor {
    follow: shared(Text, Principal) -> async ();
    follows: shared query () -> async [Account];
    post: shared (Text, Text) -> async ();
    posts: shared query (Time.Time) -> async [Message];
    get_posts_by_principal: shared (Principal) -> async [Message];
    get_name_by_principal: shared (Principal) -> async ?Text;
    timeline: shared (Time.Time) -> async [Message];
    set_name: shared (Text, Text) -> async ();
    get_name: shared query () -> async ?Text;
    clean_all: shared (Text) -> async ();
  };

  public shared func clean_all(otp: Text): async () {
    assert(otp == "123456");
    followed := List.nil();
    messages := List.nil();
    author_name := "";
  };

  public type Account = {
    name: ?Text;
    principal: Principal;
  };

  stable var followed: List.List<Account> = List.nil();

  public shared func follow(otp: Text, id: Principal): async () {
    assert(otp == "123456");
    let name = await get_name_by_principal(id);
    followed := List.push({
      name=name;
      principal=id;
    }, followed);
  };

  public shared query func follows(): async [Account] {
    List.toArray(followed);
  };

   public type Message = {
    author: Text;
    text: Text;
    time: Time.Time;
  };

  stable var messages: List.List<Message> = List.nil();

  public shared (rec) func post(otp: Text, text: Text): async () {
    assert(otp == "123456");
    messages := List.push({
      author=author_name;
      text=text;
      time=Time.now();
      }, messages);
  };

  public shared query func posts(since: Time.Time): async [Message] {
   List.toArray(List.filter(messages, func (msg: Message): Bool { msg.time >= since }))
  };

  public shared func get_name_by_principal(id: Principal): async ?Text {
    let canister: Microblog = actor(Principal.toText(id));
    await canister.get_name()
  };

  public shared func get_posts_by_principal(id: Principal): async [Message] {
      var all: List.List<Message> = List.nil();
      let canister: Microblog = actor(Principal.toText(id));
      await canister.posts(0)
  };

  public shared func timeline(since: Time.Time): async [Message] {
    var all: List.List<Message> = List.nil();

    for (act in Iter.fromList(followed)) {
      let canister: Microblog = actor(Principal.toText(act.principal));
      let msgs = await canister.posts(since);

      for (msg in Iter.fromArray(msgs)) {
        all := List.push(msg, all);
      };
    };

    List.toArray(all)
  };

  stable var author_name: Text = "";

  public shared (rec) func set_name(otp: Text, name: Text): async () {
    assert(otp == "123456");
    author_name := name;
  };

  public shared query func get_name(): async ?Text {
    ?author_name
  };
};
