import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as="h1" inverted>
                    <Image size="massive" src="/assets/logo.png" alt="logo" style={{ marginBottom: 10 }} />
                    Reactivities
                </Header>
                <Header as="h2" inverted content="Welcome to Reactivities"></Header>
                <Button as={Link} to="/login" size="huge" inverted>
                    Login
                </Button>
            </Container>
        </Segment>
    )
}
