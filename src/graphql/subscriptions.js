/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSet = `subscription OnCreateSet {
  onCreateSet {
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
export const onUpdateSet = `subscription OnUpdateSet {
  onUpdateSet {
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
export const onDeleteSet = `subscription OnDeleteSet {
  onDeleteSet {
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
export const onCreateProblem = `subscription OnCreateProblem {
  onCreateProblem {
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
export const onUpdateProblem = `subscription OnUpdateProblem {
  onUpdateProblem {
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
export const onDeleteProblem = `subscription OnDeleteProblem {
  onDeleteProblem {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
