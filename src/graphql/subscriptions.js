/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSet = `subscription OnCreateSet {
  onCreateSet {
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
export const onUpdateSet = `subscription OnUpdateSet {
  onUpdateSet {
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
export const onDeleteSet = `subscription OnDeleteSet {
  onDeleteSet {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
export const onCreateTime = `subscription OnCreateTime {
  onCreateTime {
    id
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
        company
      }
      times {
        nextToken
      }
    }
  }
}
`;
