
import { PostListProvider } from ".";
import ManagePost from "../..";

export const ManagePostWrapper = () => {
  return (
    <PostListProvider>
      <ManagePost />
    </PostListProvider>
  );
}