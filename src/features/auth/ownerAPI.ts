import { ActionData, Owner } from "../../interface/auth-context.interface";


export async function postOwner(ownerData: ActionData) {
  return new Promise<{ data: any, ownerCreated: boolean }>((resolve) => {
    setTimeout(() => resolve({ 
      data: {
        account: ownerData.address,
        email: ownerData.email,
        firstName: ownerData.firstName,
        lastName: ownerData.lastName,
        ens: ownerData.ens,
        chainId: ownerData.chainId,
      } as Owner,
      ownerCreated: true,
    }), 500)
  }
  );
}

export function fetchOwner(ownerData: ActionData) {
  return new Promise<{ data: any }>((resolve) => {
    setTimeout(() => resolve({ data: {
        account: ownerData.address,
        email: ownerData.email,
        firstName: ownerData.firstName,
        lastName: ownerData.lastName,
        ens: ownerData.ens,
        chainId: ownerData.chainId,
      } as Owner
    }), 500)
  }
  );
}

export function fetchOwnerById(account: string) {
  return new Promise<{ data: Owner }>((resolve) => {
    setTimeout(() => resolve({ data: {
        account: account,
        email: '',
        firstName: '',
        lastName: '',
        ens: '',
        chainId: 0,
      } as Owner
    }), 500)
  }
  );
}






