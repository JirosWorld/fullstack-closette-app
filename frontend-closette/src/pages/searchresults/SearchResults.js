import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import TopNav from "../../components/topnav/TopNav";
import Header from "../../components/header/Header";

function SearchResults(props) {

    useEffect(() => {
        document.title = "Zoekresultaten :: Closette"
    }, []);

    return (
        <section className="searchresults">
            <TopNav/>
            <Header
                title="Zoekresultaten"/>
        {/*    show alle toiletposts */}
            <div>
                {/*<h3>Aantal posts: {posts.length}</h3>*/}
                {/*<ul>*/}
                {/*    {posts.map((post) => {*/}
                {/*        return <li key={post.id}>*/}
                {/*            <Link to={`blog/${post.id}`}>*/}
                {/*                {post.title}*/}
                {/*            </Link>*/}
                {/*        </li>*/}
                {/*    })}*/}
                {/*</ul>*/}
            </div>
        </section>
    );
}

export default SearchResults;