/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSet = `query GetSet($id: ID!) {
  getSet(id: $id) {
    id
    author
    title
    description
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
        createdAt
        date
        setID
        author
        content
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
      author
      title
      description
      company
      problems {
        nextToken
      }
      comments {
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
      description
      company
      problems {
        nextToken
      }
      comments {
        nextToken
      }
    }
    times {
      items {
        id
        createdAt
        problemID
        time
        date
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
        description
        company
      }
      times {
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
    createdAt
    date
    setID
    author
    content
    set {
      id
      author
      title
      description
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
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      date
      setID
      author
      content
      set {
        id
        author
        title
        description
        company
      }
    }
    nextToken
  }
}
`;
export const getTime = `query GetTime($id: ID!) {
  getTime(id: $id) {
    id
    createdAt
    problemID
    time
    date
    problem {
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
        description
        company
      }
      times {
        nextToken
      }
    }
  }
}
`;
export const listTimes = `query ListTimes(
  $filter: ModelTimeFilterInput
  $limit: Int
  $nextToken: String
) {
  listTimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      problemID
      time
      date
      problem {
        id
        setID
        title
        url
        level
        completed
        time
      }
    }
    nextToken
  }
}
`;
