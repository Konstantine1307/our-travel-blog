import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ slug, title, id }) => {
    const disqusShortname = "https-johnnyleslie-com"
    const disqusConfig = {
        url: `https://johnnyleslie.com/posts/${slug}`,
        identifier: id,
        title,
    }
    return (
        <div>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}
export default DisqusComments;