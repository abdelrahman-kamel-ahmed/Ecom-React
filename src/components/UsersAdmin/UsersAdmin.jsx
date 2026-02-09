import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { API } from "../../Apis/API_Servece";
import { errorHandler } from "../../utils/errorHandler";
import { UserCard } from "../UserCard/UserCard";
import { UserDetailsModal } from "../UserDetailsModal/UserDetailsModal";
import { Loading } from "../Loading/Loading";


export const UsersAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    async function fetchUsers() {
        try {
        setLoading(true);
        const res = await API.get("/users");
        setUsers(res.data.users);
        } catch (err) {
        errorHandler(err);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <Loading />;

    return (
        <>
        <h3 className="fw-bold mb-4">👤 Users Management</h3>

        <Row className="g-3">
            {users.map(user => (
            <UserCard
                key={user.id}
                user={user}
                onView={() => setSelectedUser(user)}
            />
            ))}
        </Row>

        <UserDetailsModal
            show={!!selectedUser}
            onHide={() => setSelectedUser(null)}
            user={selectedUser}
        />
        </>
    );
};
