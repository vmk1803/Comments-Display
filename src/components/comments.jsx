import { AddCircle } from "@material-ui/icons";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const initialState = [
  {
    id: "001",
    author: "albert",
    body: "Whats the status?",
    timestamp: "Sun Aug 02 2020 18:08:45 GMT+0530",
    points: "2",
    replies: [
      {
        id: "003",
        author: "haren",
        body: "Wrote the test suites, waiting for approval?",
        timestamp: "Sun Aug 02 2020 18:12:45 GMT+0530",
        points: "3",
        replies: [
          {
            id: "004",
            author: "albert",
            body: "Thanks for the update!",
            timestamp: "Sun Aug 02 2020 18:15:45 GMT+0530",
            points: "8",
          },
        ],
      },
      {
        id: "002",
        author: "Nrupul",
        body: "looking forward for the demo!",
        timestamp: "Sun Aug 02 2020 18:10:45 GMT+0530",
        points: "2",
      },
    ],
  },
];

export const Comments = () => {
  let [open, setOpen] = useState({});
  let [commentReply, setCommentReply] = useState("");
  let [data, setData] = useState(initialState);

  function handleComment(e, id) {
    var value = open[`${id}`];

    if (value) {
      setOpen((prev) => ({ ...prev, [`${id}`]: ![`${id}`] }));
    } else {
      setOpen((prev) => ({ ...prev, [`${id}`]: true }));
    }
    // e.target.classList.toggle("toggle");
  }

  function displayData(comment) {
    return (
      <div className="commentSection">
        <div
          className="sideBar"
          onClick={(e) => {
            handleComment(e, comment.id);
          }}
        >
          <div>
            <AddCircle className="icon hello" />
          </div>
          <div className="border"></div>
        </div>
        <div className={open[`${comment.id}`] ? "toggle" : "comment"}>
          <p>
            {comment.author} {comment.points} points {comment.timestamp}
          </p>
          <h2>{comment.body}</h2>
          <div className="tags">
            <div
              className="replyTag"
              onClick={(e) => {
                var value = `reply_${comment.id}`;
                console.log(comment.id);

                if (open[`reply_${comment.id}`]) {
                  setOpen((prev) => ({
                    ...prev,
                    [`reply_${comment.id}`]: !value,
                  }));
                } else {
                  setOpen((prev) => ({
                    ...prev,
                    [`reply_${comment.id}`]: true,
                  }));
                }
              }}
            >
              Reply
            </div>
            <div>Give Award</div>
            <div>Share</div>
            <div>report</div>
            <div>Save</div>
          </div>

          {open[`reply_${comment.id}`] ? (
            <div className="reply-box">
              <input
                type="text"
                placeholder="enter comment..."
                onChange={(e) => {
                  setCommentReply(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  var obj = {
                    id: uuid(),
                    author: comment.author,
                    timestamp: new Date().toString(),
                    points: 0,
                    body: commentReply,
                  };

                  if (
                    comment.replies !== undefined &&
                    comment.replies.length !== 0
                  ) {
                    comment.replies = [...comment.replies, obj];
                  } else {
                    comment.replies = [obj];
                  }
                  var currentData = [...data];
                  console.log(data);
                  //   data.forEach((e) => {
                  //     if (e.id === comment.id) {
                  //       if (e.replies.length !== 0) {
                  //         e.replies = [...e.replies, obj];
                  //       } else {
                  //         e.replies = [obj];
                  //       }

                  //       currentData.push(e);
                  //     }
                  //   });

                  setData(currentData);
                }}
              >
                comment
              </button>
            </div>
          ) : null}

          {comment.replies
            ? comment.replies.map((e) => {
                return <div key={e.id}>{displayData(e)}</div>;
              })
            : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Comments</h1>
      {data.map((e) => {
        return <div key={e.id}>{displayData(e)}</div>;
      })}
    </div>
  );
};
