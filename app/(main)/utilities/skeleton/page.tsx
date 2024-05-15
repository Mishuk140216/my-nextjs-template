import { Skeleton } from "primereact/skeleton";

const TableSkeleton = () => {
  return (
    <div className="border-round border-1 surface-border p-4">
      <div className="flex justify-content-between mt-1 pb-3">
        <Skeleton width="20rem" height="2.5rem"></Skeleton>
        <Skeleton width="10rem" height="2.5rem"></Skeleton>
      </div>
      <div className="pb-2">
        <Skeleton width="100%" height="4vw"></Skeleton>
      </div>
      <div className="pb-2">
        <Skeleton width="100%" height="4vw"></Skeleton>
      </div>
      <div className="pb-2">
        <Skeleton width="100%" height="4vw"></Skeleton>
      </div>
      <div className="pb-2">
        <Skeleton width="100%" height="4vw"></Skeleton>
      </div>
      <div className="pb-2">
        <Skeleton width="100%" height="4vw"></Skeleton>
      </div>
    </div>
  );
};

export default TableSkeleton;
