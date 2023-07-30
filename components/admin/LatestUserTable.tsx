import { FC } from "react";
import ProfileIcon from "../common/ProfileIcon";
import { LatestUserProfile } from "types";

interface Props {
  users?: LatestUserProfile[];
}

const LatestUserTable: FC<Props> = ({ users }): JSX.Element => {
  return (
    <div>
      <table className="w-full text-left text-primary-dark dark:text-primary-light">
        <tbody>
          <tr className="text-left bg-highlight-dark text-primary-light font-heading">
            <th className="p-2">Profile</th>
            <th className="p-2">Provider</th>
            <th className="p-2">Role</th>
          </tr>

          {users?.map((profile) => {
            return (
              <tr className="border-b" key={profile.id}>
                <td className="py-2">
                  <div className="flex items-center space-x-2">
                    <ProfileIcon
                      nameInitial={profile.name[0].toUpperCase()}
                      avatar={profile.avatar}
                    />
                    <p>{profile.name}</p>
                  </div>
                </td>
                <td>{profile.provider}</td>
                <td>{profile.role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LatestUserTable;
