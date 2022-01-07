import React from 'react';
import { useParams, Link } from 'react-router-dom';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";

function ToiletPost(props) {
    const { blogId: toiletId } = useParams();

    const currentPost = posts.find((post) => {
        return post.id === toiletId;
    });

    return (
        <>
            {/*<article>*/}
            {/*    <h1>{currentPost.title}</h1>*/}
            {/*    <h3>{currentPost.date}</h3>*/}
            {/*    <p>{currentPost.content}</p>*/}
            {/*</article>*/}
            {/*<article>*/}
            {/*    <Link to="/">Terug naar Home</Link>*/}
            {/*</article>*/}
        </>
    );
}

export default ToiletPost;