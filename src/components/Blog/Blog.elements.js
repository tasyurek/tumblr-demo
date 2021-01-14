import React from "react";

export const Notion = ({ tumblelog, totalPosts }) => {
  return (
    <div className="blog__notion">
      <h1>{tumblelog.title}</h1>
      <h3>{tumblelog.description}</h3>
      <h4>Total Posts: {totalPosts}</h4>
    </div>
  );
};

export const PostList = ({ posts }) => {
  let dates = posts.map((post) => {
    let date = new Date(post.date);
    return date.toLocaleDateString();
  });

  dates = [...new Set(dates)];

  const categorizedPosts = dates.map((date) => {
    const categorizedPost = posts.map((post) => {
      if (post.type === "audio") return;

      let d = new Date(post.date);
      let shortDate = d.toLocaleDateString();

      if (shortDate === date) return post;
    });

    return {
      date,
      posts: categorizedPost,
    };
  });

  return (
    <div className="blog__post-list">
      {categorizedPosts.map((categorize, index) => {
        return (
          <div className="blog__post-list__category" key={index}>
            <PostDate date={categorize.date} />
            <CategorizedPosts posts={categorize.posts} />
          </div>
        );
      })}
    </div>
  );
};

const CategorizedPosts = ({ posts }) => {
  return (
    <div className="blog__post-list__category__item">
      {posts.map((post, index) => {
        if (!post) return;

        return (
          <div
            className="post-wrapper"
            key={index}
            onClick={() => window.open(post.url, "_blank")}
          >
            {post.type === "quote" && <QuotePost post={post} />}
            {post.type === "photo" && <PhotoPost post={post} />}
            {post.type === "link" && <LinkPost post={post} />}
            {post.type === "conversation" && <ConversationPost post={post} />}
            {post.type === "regular" && <RegularPost post={post} />}
          </div>
        );
      })}
    </div>
  );
};

const QuotePost = ({ post }) => {
  const quoteSourceRef = React.useRef(null);

  React.useEffect(() => {
    if (quoteSourceRef && quoteSourceRef.current) {
      quoteSourceRef.current.innerHTML = post["quote-source"];
    }
  }, []);

  return (
    <div className="post">
      <h1 className="quote-text">{post["quote-text"]}</h1>
      <p className="quote-source" ref={quoteSourceRef}></p>
    </div>
  );
};

const PhotoPost = ({ post }) => {
  const captureRef = React.useRef(null);

  React.useEffect(() => {
    if (captureRef && captureRef.current) {
      captureRef.current.innerHTML = post["photo-caption"];
    }
  }, []);

  return (
    <div className="post">
      <img src={post["photo-url-400"]} alt="photo-url-400" />
      <p className="capture" ref={captureRef}></p>
      <PostDetails post={post} />
    </div>
  );
};

const LinkPost = ({ post }) => {
  const descriptionRef = React.useRef(null);

  React.useEffect(() => {
    if (descriptionRef && descriptionRef.current) {
      descriptionRef.current.innerHTML = post["link-description"];
    }
  }, []);

  return (
    <div className="post">
      <h3>{post["link-text"]}</h3>
      <p ref={descriptionRef}>{post["link-text"]}</p>
      <PostDetails post={post} />
    </div>
  );
};

const ConversationPost = ({ post }) => {
  const ConversationComponent = ({ conversation }) => {
    return (
      <div className="conversation">
        {conversation.map((line, index) => {
          return (
            <p key={index}>
              <span>{line.name}:</span>
              {line.phrase}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="post">
      <ConversationComponent conversation={post.conversation} />
      <PostDetails post={post} />
    </div>
  );
};

const PostDetails = ({ post }) => {
  if (post.type === "audio") return null;

  return (
    <div className="post__details">
      <PostDate date={post.date} />
      <p>{post.type}</p>
    </div>
  );
};

const RegularPost = ({ post }) => {
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (bodyRef && bodyRef.current) {
      bodyRef.current.innerHTML = post["regular-body"];
    }
  }, []);

  return (
    <div className="post">
      {post["regular-title"] && <h3>{post["regular-title"]}</h3>}

      <p ref={bodyRef}></p>
      <PostDetails post={post} />
    </div>
  );
};

const PostDate = ({ date }) => {
  var d = new Date(date);
  var n = d.toLocaleDateString();

  return <div className="post__date">{n}</div>;
};
