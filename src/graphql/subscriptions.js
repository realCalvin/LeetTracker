/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSet = `subscription OnCreateSet {
  onCreateSet {
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
export const onUpdateSet = `subscription OnUpdateSet {
  onUpdateSet {
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
export const onDeleteSet = `subscription OnDeleteSet {
  onDeleteSet {
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
export const onCreateProblem = `subscription OnCreateProblem {
  onCreateProblem {
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
export const onUpdateProblem = `subscription OnUpdateProblem {
  onUpdateProblem {
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
export const onDeleteProblem = `subscription OnDeleteProblem {
  onDeleteProblem {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
export const onCreateTime = `subscription OnCreateTime {
  onCreateTime {
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
export const onUpdateTime = `subscription OnUpdateTime {
  onUpdateTime {
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
export const onDeleteTime = `subscription OnDeleteTime {
  onDeleteTime {
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
