import React from "react";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

const DisplayCard = ({ problem, actionOnCard, checkLevel, toolMessage }) => {
  return (
    // OverlayTrigger is used to display a tooltip when hovering over card
    <OverlayTrigger
      key={problem.id}
      placement={"top"}
      overlay={<Tooltip id={`tooltip-${"top"}`}>{toolMessage}</Tooltip>}
    >
      <Card
        className="problem-card"
        bg="light"
        style={{ width: "18rem" }}
        key={problem.id}
        id={problem.id}
        onClick={() => {
          actionOnCard(problem.id, problem.title, problem.url, problem.level);
        }}
      >
        <Card.Header className={"card-level-" + problem.level}>
          {checkLevel(problem.level)}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <a href={"https://leetcode.com/problems/" + problem.url}>
              {problem.title}
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
};

export default DisplayCard;
