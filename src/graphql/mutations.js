/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSet = `mutation CreateSet(
  $input: CreateSetInput!
  $condition: ModelSetConditionInput
) {
  createSet(input: $input, condition: $condition) {
    id
    author
    title
    company
    problems {
      items {
        id
        setID
        title
        url
        level
        completed
        time
      }
      nextToken
    }
    comments {
      items {
        id
        setID
        author
        content
      }
      nextToken
    }
  }
}
`;
export const updateSet = `mutation UpdateSet(
  $input: UpdateSetInput!
  $condition: ModelSetConditionInput
) {
  updateSet(input: $input, condition: $condition) {
    id
    author
    title
    company
    problems {
      items {
        id
        setID
        title
        url
        level
        completed
        time
      }
      nextToken
    }
    comments {
      items {
        id
        setID
        author
        content
      }
      nextToken
    }
  }
}
`;
export const deleteSet = `mutation DeleteSet(
  $input: DeleteSetInput!
  $condition: ModelSetConditionInput
) {
  deleteSet(input: $input, condition: $condition) {
    id
    author
    title
    company
    problems {
      items {
        id
        setID
        title
        url
        level
        completed
        time
      }
      nextToken
    }
    comments {
      items {
        id
        setID
        author
        content
      }
      nextToken
    }
  }
}
`;
export const createProblem = `mutation CreateProblem(
  $input: CreateProblemInput!
  $condition: ModelProblemConditionInput
) {
  createProblem(input: $input, condition: $condition) {
    id
    setID
    title
    url
    level
    completed
    time
    set {
      id
      author
      title
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const updateProblem = `mutation UpdateProblem(
  $input: UpdateProblemInput!
  $condition: ModelProblemConditionInput
) {
  updateProblem(input: $input, condition: $condition) {
    id
    setID
    title
    url
    level
    completed
    time
    set {
      id
      author
      title
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const deleteProblem = `mutation DeleteProblem(
  $input: DeleteProblemInput!
  $condition: ModelProblemConditionInput
) {
  deleteProblem(input: $input, condition: $condition) {
    id
    setID
    title
    url
    level
    completed
    time
    set {
      id
      author
      title
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const createComment = `mutation CreateComment(
  $input: CreateCommentInput!
  $condition: ModelCommentConditionInput
) {
  createComment(input: $input, condition: $condition) {
    id
    setID
    author
    content
    set {
      id
      author
      title
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const updateComment = `mutation UpdateComment(
  $input: UpdateCommentInput!
  $condition: ModelCommentConditionInput
) {
  updateComment(input: $input, condition: $condition) {
    id
    setID
    author
    content
    set {
      id
      author
      title
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const deleteComment = `mutation DeleteComment(
  $input: DeleteCommentInput!
  $condition: ModelCommentConditionInput
) {
  deleteComment(input: $input, condition: $condition) {
    id
    setID
    author
    content
    set {
      id
      author
      title
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
  }
}
`;
