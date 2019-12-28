/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSet = `query GetSet($id: ID!) {
  getSet(id: $id) {
    id
    title
    company
    problems {
      items {
        id
        name
      }
      nextToken
    }
  }
}
`;
export const listSets = `query ListSets($filter: ModelSetFilterInput, $limit: Int, $nextToken: String) {
  listSets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      company
      problems {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getProblem = `query GetProblem($id: ID!) {
  getProblem(id: $id) {
    id
    name
    set {
      id
      title
      company
      problems {
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
export const listProblems = `query ListProblems(
  $filter: ModelProblemFilterInput
  $limit: Int
  $nextToken: String
) {
  listProblems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      set {
        id
        title
        company
      }
      comments {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    content
    problem {
      id
      name
      set {
        id
        title
        company
      }
      comments {
        nextToken
      }
    }
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      problem {
        id
        name
      }
    }
    nextToken
  }
}
`;
