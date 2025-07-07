/// 부모의 Tree 찾으면서 True로 변경

export const openMenusToTarget = (data, targetCode) => {
    let shouldOpen = false;

    const updatedData = data.map(item => {
        if (item.menu_code === targetCode) {
            shouldOpen = true;
            return { ...item, menu_open: true };
        }

        if (item.children.length > 0) {
            const updatedChildren = openMenusToTarget(item.children, targetCode);
            const isChildOpen = updatedChildren.some(child => child.menu_open);

            if (isChildOpen) {
                shouldOpen = true;
                return { ...item, menu_open: true, children: updatedChildren };
            }

            return { ...item, children: updatedChildren };
        }

        return item;
    });

    return shouldOpen ? updatedData : data;
};

export const setMenuOpenWithTopParent = (data, targetCode) => {
    const findTopParent = (items, code, parents = []) => {
        for (const item of items) {
            if (item.menu_code === code) {
                if (item.menu_parent_code === 'A01') {
                    return parents; // Top에 도달하면 현재 부모들 반환
                }
                return findTopParent(data, item.menu_parent_code, [...parents, item.menu_code]);
            }
            if (item.children.length > 0) {
                const result = findTopParent(item.children, code, parents);
                if (result.length > 0) return result;
            }
        }
        return [];
    };

    const topParents = findTopParent(data, targetCode);

    return data.map(item => {
        if (topParents.includes(item.menu_code) || item.menu_code === targetCode) {
            return { ...item, menu_open: true, children: setMenuOpenWithTopParent(item.children, targetCode) };
        }
        return { ...item, children: setMenuOpenWithTopParent(item.children, targetCode) };
    });
};

// 다음 레벨의 State 찾기

export const findNextState = (data, currentCode) => {
    let parentStack = []; // 부모들을 추적하기 위한 스택

    const findNodeAndParent = (items, code, parents = []) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.menu_code === code) {
                return { node: item, index: i, parent: parents[parents.length - 1] || null, siblings: items };
            }

            if (item.children.length > 0) {
                const result = findNodeAndParent(item.children, code, [...parents, item]);
                if (result) return result;
            }
        }
        return null;
    };

    const result = findNodeAndParent(data, currentCode);

    if (!result) return null; // 현재 코드가 존재하지 않으면 null 반환

    const { node, index, parent, siblings } = result;

    // 1️⃣ 현재 노드의 children이 있다면, 첫 번째 자식을 반환
    if (node.children.length > 0) {
        return node.children[0];
    }

    // 2️⃣ 현재 노드의 다음 형제가 있다면, 다음 형제로 이동
    if (index + 1 < siblings.length) {
        return siblings[index + 1];
    }

    // 3️⃣ 부모의 다음 형제로 이동 (재귀적으로 부모를 타고 올라감)
    let currentParent = parent;
    while (currentParent) {
        const parentResult = findNodeAndParent(data, currentParent.menu_code);
        if (!parentResult) break;

        const { index: parentIndex, siblings: parentSiblings } = parentResult;
        if (parentIndex + 1 < parentSiblings.length) {
            return parentSiblings[parentIndex + 1];
        }

        currentParent = parentResult.parent;
    }

    // 4️⃣ 이동할 곳이 없으면 그대로 유지
    return node;
};

// 이전 레벨 찾기

export const findPrevState = (data, currentCode) => {
    const findNodeAndParent = (items, code, parents = []) => {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (item.menu_code === code) {
                return { node: item, index: i, parent: parents[parents.length - 1] || null, siblings: items };
            }

            if (item.children.length > 0) {
                const result = findNodeAndParent(item.children, code, [...parents, item]);
                if (result) return result;
            }
        }
        return null;
    };

    const findDeepestChild = node => {
        if (node.children.length === 0) return node;
        return findDeepestChild(node.children[node.children.length - 1]);
    };

    const result = findNodeAndParent(data, currentCode);

    if (!result) return null; // 현재 코드가 존재하지 않으면 null 반환

    const { node, index, parent, siblings } = result;

    // 1️⃣ 현재 노드의 이전 형제가 있다면, 그 형제의 가장 깊은 자손을 반환
    if (index > 0) {
        return findDeepestChild(siblings[index - 1]);
    }

    // 2️⃣ 이전 형제가 없으면 부모로 이동
    if (parent) {
        return parent;
    }

    // 3️⃣ 이동할 곳이 없으면 현재 상태 유지
    return node;
};
