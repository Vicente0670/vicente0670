import component from "./component.module.css";

export default function IndividualForumDisplay({ post }: { post: any }) {
  
  return (
    <>
      <div className={component.root}>
        <div className={component.title}>
          <h1>{post.title}</h1>
        </div>
        <div className={component.content}>
          <p>{post.content}</p>
        </div>
      </div>
    </>
  )

}