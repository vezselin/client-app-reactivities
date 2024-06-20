import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store.ts";
import Loading from "../../../app/layout/Loading.tsx";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivityDetailedHeader from "./ActivityDetailedHeader.tsx";
import ActivityDetailedInfo from "./ActivityDetailedInfo.tsx";
import ActivityDetailedChat from "./ActivityDetailedChat.tsx";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar.tsx";

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const {
        selectedActivity: activity,
        loadActivity,
        loadingInitial,
    } = activityStore;

    const { id } = useParams();

    useEffect(() => {
        if (id) void loadActivity(id);
    }, [id, loadActivity]);

    if (loadingInitial || !activity) return <Loading />;

    return (
        <Grid>
            <Grid.Column width={"10"}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={"6"}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    );
});
