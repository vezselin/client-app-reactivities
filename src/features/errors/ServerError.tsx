import { useStore } from "../../app/stores/store.ts";
import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";

export default observer(function ServerError() {
    const { commonStore } = useStore();
    return (
        <Container>
            <Header as="h1" content="Server Error" />
            <Header
                sub
                as="h5"
                color="red"
                content={commonStore.error?.message}
            />
            {commonStore.error?.details && (
                <Segment>
                    <Header as="h4" content="Stack track" color="teal" />
                    <code style={{ marginTop: "10px" }}>
                        {commonStore.error.details}
                    </code>
                </Segment>
            )}
        </Container>
    );
});
