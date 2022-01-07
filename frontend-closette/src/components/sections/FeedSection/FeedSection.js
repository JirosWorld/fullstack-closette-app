import React from 'react';

function FeedSection({children}) {
    return (
        <section className="feed-section">
            <div>~</div>
            <div>~</div>
            <div>~</div>
            {children}
        </section>
    );
}

export default FeedSection;