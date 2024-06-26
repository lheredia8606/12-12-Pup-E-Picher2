export class ApiCRUD<T> {
  constructor(private baseUrl: string) {}

  getAll(): Promise<T[]> {
    return fetch(this.baseUrl)
      .then((response) => {
        if (!response.ok) throw new Error("could not get all Elements");
        return response.json();
      })
      .then((data: T[]) => data);
  }

  post(element: Omit<T, "id">): Promise<T> {
    return fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(element),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("could not add the Element");
        return response.json();
      })
      .then((data: T) => data);
  }

  delete(id: number): Promise<T> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("could not erase the Element");
        return response.json();
      })
      .then((data: T) => data);
  }

  update(id: number, element: Partial<T>): Promise<T> {
    return fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(element),
    })
      .then((response) => {
        if (!response.ok) throw new Error("could not update the element");
        return response.json();
      })
      .then((data: T) => data);
  }
}
