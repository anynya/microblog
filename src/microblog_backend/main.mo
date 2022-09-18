import List "mo:base/List";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

actor {
  public type Message = {
    data: Text;
    time: Time.Time;
  };

  public type Microblog = actor {
    follow: shared(Principal) -> async ();
    follows: shared query () -> async [Principal];
    post: shared (Text) -> async ();
    posts: shared query (since: Time.Time) -> async [Message];
    timeline: shared (since: Time.Time) -> async [Message];
  };

  stable var followed: List.List<Principal> = List.nil();

  public shared func follow(id: Principal): async () {
    followed := List.push(id, followed);
  };

  public shared query func follows(): async [Principal] {
    List.toArray(followed);
  };

  stable var messages: List.List<Message> = List.nil();

  public shared (rec) func post(text: Text): async () {
    assert(Principal.toText(rec.caller) == "ozasf-so6uh-apjxq-umq5a-soikw-gepv3-vwwjg-4fir4-bzk5h-dn3mq-6ae");
    messages := List.push({data=text; time=Time.now();}, messages);
  };

  public shared query func posts(since: Time.Time): async [Message] {
   List.toArray(List.filter(messages, func (msg: Message): Bool { msg.time >= since }))
  };

  public shared func timeline(since: Time.Time): async [Message] {
    var all: List.List<Message> = List.nil();

    for (id in Iter.fromList(followed)) {
      let canister: Microblog = actor(Principal.toText(id));
      let msgs = await canister.posts(since);

      for (msg in Iter.fromArray(msgs)) {
        all := List.push(msg, all);
      };
    };

    List.toArray(all)
  };
};
