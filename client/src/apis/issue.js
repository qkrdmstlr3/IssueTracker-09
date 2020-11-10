import request from '../lib/axios';

const getListAPI = async (search) => {
  try {
    const {
      data: { issues },
    } = await request({
      method: 'get',
      params: `/issue?q=${search}`,
    });

    return { issues };
  } catch (error) {
    return false;
  }
};

const getIssueByIdAPI = async (id) => {
  try {
    const { data } = await request({
      method: 'get',
      params: `/issue/${id}`,
    });

    return data;
  } catch (error) {
    return false;
  }
};

const updateAssigneeAPI = async (id, assigneeId, joined) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/assignee/${id}`,
      data: {
        assigneeId,
        joined,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateMilestoneAPI = async (id, milestoneId) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/milestone/${id}`,
      data: {
        milestoneId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

const updateLabelAPI = async (id, labelId, joined) => {
  try {
    await request({
      method: 'PUT',
      params: `/issue/label/${id}`,
      data: {
        labelId,
        joined,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export {
  getListAPI,
  getIssueByIdAPI,
  updateAssigneeAPI,
  updateMilestoneAPI,
  updateLabelAPI,
};
