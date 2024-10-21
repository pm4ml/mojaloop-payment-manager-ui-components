import find from 'lodash/find';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const userJson = `{
  "name": "Ivan",
  "username": "Ivan",
  "lastname": "Annovazzi",
  "userId": "e1ffc1df-0ec7-46cc-91c3-552bc629ecd5"
}`;
const companiesJson = `{
  "companies": [
    { "id": "d3cdb892-8691-4cdc-ab23-674cab7e3446", "name": "company1" },
    { "id": "851df841-3381-422a-b4c4-f1339f5ae95a", "name": "Evil Corp" },
    { "id": "ce36255f-d736-4457-beab-a6f6386c732a", "name": "Avis" },
    { "id": "570a6371-048f-4d70-806b-ba7d6bf05cf3", "name": "company4" }
  ]
}`;
const organizationsJson = `{
  "organizations": [
    {
      "id": "18a8d391-597b-499e-9ef7-a5c568fecb03",
      "name": "EvilOrg",
      "company": "851df841-3381-422a-b4c4-f1339f5ae95a",
      "environments": [...]
    }
  ]
}`;

const user = JSON.parse(userJson);
const companies = JSON.parse(companiesJson).companies;
const organizations = JSON.parse(organizationsJson).organizations;

const getCompanies = async () => new Promise(resolve => setTimeout(() => resolve(companies), 1000));
const getOrganizations = async (companyId) =>
  new Promise(resolve => {
    const availableOrganizations = organizations.filter(organization => organization.company === companyId);
    setTimeout(() => resolve(availableOrganizations), 2500);
  });

const NavbarWrapper = () => {
  const [activeCompanyId, setActiveCompanyId] = useState(localStorage.getItem('companyId'));
  const [activeOrganizationId, setActiveOrganizationId] = useState(localStorage.getItem('organizationId'));
  const [activeEnvironmentId, setActiveEnvironmentId] = useState(localStorage.getItem('environmentId'));
  const [companiesList, setCompaniesList] = useState([]);
  const [organizationsList, setOrganizationsList] = useState([]);
  const [isOrganizationPending, setIsOrganizationPending] = useState(false);

  useEffect(() => {
    const loadCompanies = async () => {
      const availableCompanies = await getCompanies();
      setCompaniesList(availableCompanies);
      const activeCompany = find(availableCompanies, { id: activeCompanyId });
      if (activeCompany) {
        setCompany(activeCompany);
      }
    };
    loadCompanies();
  }, []);

  const setCompany = (company) => {
    localStorage.setItem('companyId', company.id);
    setActiveCompanyId(company.id);
    loadOrganizations(company);
  };

  const loadOrganizations = async (company) => {
    setIsOrganizationPending(true);
    const availableOrganizations = await getOrganizations(company.id);
    setOrganizationsList(availableOrganizations);
    setIsOrganizationPending(false);
  };

  const changeCompany = (company) => {
    setCompany(company);
    localStorage.removeItem('environmentId');
    setActiveEnvironmentId(null);
  };

  const signout = () => {
    localStorage.removeItem('companyId');
    localStorage.removeItem('organizationId');
    localStorage.removeItem('environmentId');
    setActiveCompanyId(null);
    setActiveOrganizationId(null);
    setActiveEnvironmentId(null);
    setOrganizationsList([]);
  };

  return (
    <Navbar
      user={user}
      companies={companiesList}
      organizations={organizationsList}
      isLoadingOrganizations={isOrganizationPending}
      activeCompanyId={activeCompanyId}
      activeOrganizationId={activeOrganizationId}
      activeEnvironmentId={activeEnvironmentId}
      onCompanyChange={changeCompany}
      onOrganizationChange={(organization) => localStorage.setItem('organizationId', organization.id)}
      onEnvironmentChange={(environment) => localStorage.setItem('environmentId', environment.id)}
      onSignout={signout}
    />
  );
};

export default NavbarWrapper;
