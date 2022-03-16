import { AddCircle } from "@material-ui/icons";
import { useState } from "react";

export const Comments = () => {
  let [open, setOpen] = useState({});

  const data = [
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
            <div>Reply</div>
            <div>Give Award</div>
            <div>Share</div>
            <div>report</div>
            <div>Save</div>
          </div>

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
