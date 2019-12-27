/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSet = `mutation CreateSet(
  $input: CreateSetInput!
  $condition: ModelSetConditionInput
) {
  createSet(input: $input, condition: $condition) {
    id
    title
    Problems {
      items {
        id
        name
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
    title
    Problems {
      items {
        id
        name
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
    title
    Problems {
      items {
        id
        name
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
    name
    set {
      id
      title
      Problems {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
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
    name
    set {
      id
      title
      Problems {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
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
    name
    set {
      id
      title
      Problems {
        nextToken
      }
    }
    comments {
      items {
        id
        content
      }
      nextToken
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
    content
    problem {
      id
      name
      set {
        id
        title
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
    content
    problem {
      id
      name
      set {
        id
        title
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
    content
    problem {
      id
      name
      set {
        id
        title
      }
      comments {
        nextToken
      }
    }
  }
}
`;
