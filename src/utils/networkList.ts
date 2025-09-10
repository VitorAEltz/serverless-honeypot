const AZION_TOKEN = process.env.AZION_TOKEN!;
const NETWORK_LIST_ID = '48334';
const AZION_API_BASE = 'https://api.azion.com/v4/workspace/network_lists';

interface NetworkListItem {
  id: number;
  name: string;
  type: string;
  items: string[];
  last_editor: string;
  last_modified: string;
  active: boolean;
}

interface NetworkListResponse {
  data: NetworkListItem;
}

interface PatchResponse {
  state: string;
  data: NetworkListItem;
}

export async function checkAndUpdateNetworkList(ip: string): Promise<boolean> {
  try {
    console.log(`🔍 Checking network list for IP: ${ip}`);
    
    // Task 1: Retrieve network list and check if IP exists
    const networkList = await retrieveNetworkList();
    const ipExists = networkList.items.includes(ip);
    
    if (ipExists) {
      console.log(`✅ IP ${ip} already exists in network list`);
      return false; // IP already exists, no action needed
    }
    
    console.log(`⚠️ IP ${ip} not found in network list. Adding...`);
    
    // Task 2: Add IP to network list if not found
    const success = await addIpToNetworkList(ip, networkList.items);
    
    if (success) {
      console.log(`✅ Successfully added IP ${ip} to network list`);
      return true; // IP was added
    } else {
      console.error(`❌ Failed to add IP ${ip} to network list`);
      return false;
    }
    
  } catch (error) {
    console.error('Error in network list operation:', error);
    return false;
  }
}

async function retrieveNetworkList(): Promise<NetworkListItem> {
  const response = await fetch(`${AZION_API_BASE}/${NETWORK_LIST_ID}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${AZION_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve network list: ${response.status} ${response.statusText}`);
  }

  const result: NetworkListResponse = await response.json();
  return result.data;
}

async function addIpToNetworkList(newIp: string, currentItems: string[]): Promise<boolean> {
  // Create new items array with the additional IP
  const updatedItems = [...currentItems, newIp];
  
  const response = await fetch(`${AZION_API_BASE}/${NETWORK_LIST_ID}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Token ${AZION_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: updatedItems,
    }),
  });

  if (!response.ok) {
    console.error(`Failed to update network list: ${response.status} ${response.statusText}`);
    return false;
  }

  const result: PatchResponse = await response.json();
  
  if (result.state === 'executed') {
    console.log(`Network list updated successfully. New items count: ${result.data.items.length}`);
    return true;
  }
  
  return false;
}
