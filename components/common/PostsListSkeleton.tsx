
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import {FC} from "react";

const PostsListSkeleton: FC = (): JSX.Element => {
  return (
    <>
      {new Array(6).fill("").map((item, ind) => (
        <div key={ind} className="flex flex-col gap-y-4">
          <Skeleton width={350} height={200}/>
          <Skeleton width={250} height={24}/>
          <Skeleton width={350} height={80}/>
        </div>
      ))}
    </>
  )
}


export default PostsListSkeleton;
